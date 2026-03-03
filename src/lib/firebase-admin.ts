import 'server-only';

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  applicationDefault,
  cert,
  getApps,
  initializeApp,
  type App,
  type AppOptions,
} from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

type ServiceAccountConfig = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

type RawServiceAccountConfig = Partial<ServiceAccountConfig> & {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

function readTrimmedString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function parseServiceAccount(): ServiceAccountConfig | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as RawServiceAccountConfig;
    const projectId = readTrimmedString(parsed.projectId ?? parsed.project_id);
    const clientEmail = readTrimmedString(parsed.clientEmail ?? parsed.client_email);
    const privateKey = readTrimmedString(parsed.privateKey ?? parsed.private_key);

    if (!projectId || !clientEmail || !privateKey) {
      return null;
    }

    return {
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    };
  } catch {
    return null;
  }
}

function readProjectIdFromFirebaseRc(): string | null {
  try {
    const firebaseRcPath = join(process.cwd(), '.firebaserc');
    const raw = readFileSync(firebaseRcPath, 'utf8');
    const parsed = JSON.parse(raw) as {
      projects?: {
        default?: unknown;
      };
    };

    return readTrimmedString(parsed.projects?.default);
  } catch {
    return null;
  }
}

function resolveProjectId(serviceAccountProjectId?: string): string | null {
  const candidates = [
    serviceAccountProjectId,
    process.env.FIREBASE_PROJECT_ID,
    process.env.GOOGLE_CLOUD_PROJECT,
    process.env.GCLOUD_PROJECT,
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    readProjectIdFromFirebaseRc(),
  ];

  for (const candidate of candidates) {
    const projectId = readTrimmedString(candidate);
    if (projectId) return projectId;
  }

  return null;
}

let adminApp: App | null = null;
let adminDb: Firestore | null = null;

try {
  adminApp = getApps().at(0) ?? null;

  if (!adminApp) {
    const serviceAccount = parseServiceAccount();
    const resolvedProjectId = resolveProjectId(serviceAccount?.projectId);

    const appOptions: AppOptions = serviceAccount
      ? {
          credential: cert(serviceAccount),
          projectId: serviceAccount.projectId,
        }
      : {
          credential: applicationDefault(),
          ...(resolvedProjectId ? { projectId: resolvedProjectId } : {}),
        };

    adminApp = initializeApp(appOptions);
  }

  adminDb = getFirestore(adminApp);
} catch {
  adminApp = null;
  adminDb = null;
}

export { adminApp, adminDb };
