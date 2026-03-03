type TurnstileResponse = {
  success?: boolean;
  'error-codes'?: string[];
};

export type TurnstileConfigState = 'enabled' | 'disabled' | 'misconfigured';

export function getTurnstileConfigState(): TurnstileConfigState {
  const hasSecret = Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
  const hasSiteKey = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());

  if (hasSecret && hasSiteKey) return 'enabled';
  if (!hasSecret && !hasSiteKey) return 'disabled';

  return 'misconfigured';
}

export function isTurnstileEnabled(): boolean {
  return getTurnstileConfigState() === 'enabled';
}

export async function verifyTurnstileToken(params: {
  token: string | null;
  remoteIp?: string | null;
}): Promise<boolean> {
  const configState = getTurnstileConfigState();
  if (configState === 'disabled') return true;
  if (configState === 'misconfigured') return false;

  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return false;

  const token = params.token?.trim();
  if (!token) return false;

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    if (params.remoteIp?.trim()) {
      body.set('remoteip', params.remoteIp.trim());
    }

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body,
        cache: 'no-store',
      }
    );

    if (!response.ok) return false;

    const data = (await response.json()) as TurnstileResponse;
    return data.success === true;
  } catch {
    return false;
  }
}
