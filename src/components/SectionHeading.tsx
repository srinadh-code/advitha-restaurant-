


import React from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  sub?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function SectionHeading({
  eyebrow,
  title,
  sub,
  level = 2,
}: SectionHeadingProps) {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold font-semibold">
          {eyebrow}
        </p>
      )}

      <Heading className="font-display text-3xl md:text-4xl font-bold">
        {title}
      </Heading>

      {sub && (
        <p className="mt-3 text-muted-foreground">
          {sub}
        </p>
      )}
    </div>
  );
}