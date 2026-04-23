interface SpotlightPullquoteProps {
  quote: string;
  attribution: string;
}

export function SpotlightPullquote({ quote, attribution }: SpotlightPullquoteProps) {
  const formatted = quote.startsWith('"') || quote.startsWith('\u201c') ? quote : `\u201c${quote}\u201d`;
  return (
    <div className="spotlight-pullquote">
      <blockquote>{formatted}</blockquote>
      <cite>{attribution}</cite>
    </div>
  );
}

export default SpotlightPullquote;
