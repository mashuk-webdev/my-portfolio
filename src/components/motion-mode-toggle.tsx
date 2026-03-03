'use client';

import { Gauge, Waves, Wind, Zap, type LucideIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { type MotionMode, useMotionMode } from '@/components/providers/motion-mode-provider';

const modes: Array<{ value: MotionMode; label: string; hint: string; icon: LucideIcon }> = [
  { value: 'normal', label: 'Normal', hint: 'Balanced motion', icon: Zap },
  { value: 'butter', label: 'Butter', hint: 'Extra smooth flow', icon: Waves },
  { value: 'minimal', label: 'Minimal', hint: 'Low motion mode', icon: Wind },
];

function getLabel(mode: MotionMode): string {
  return modes.find((entry) => entry.value === mode)?.label ?? 'Motion';
}

export function MotionModeToggle() {
  const { mode, setMode } = useMotionMode();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Motion mode: ${getLabel(mode)}`}
          title={`Motion mode: ${getLabel(mode)}`}
        >
          <Gauge className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Animation Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={mode}
          onValueChange={(value) => setMode(value as MotionMode)}
        >
          {modes.map((entry) => (
            <DropdownMenuRadioItem key={entry.value} value={entry.value}>
              <entry.icon className="h-4 w-4" />
              <div className="flex flex-col gap-0.5">
                <span>{entry.label}</span>
                <span className="text-[11px] text-muted-foreground">{entry.hint}</span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
