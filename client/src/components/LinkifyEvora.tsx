interface LinkifyEvoraProps {
  text: string;
  className?: string;
}

export default function LinkifyEvora({ text, className = "" }: LinkifyEvoraProps) {
  const evoraLink = "https://www.google.com/maps/place/Évora,+Portugal";
  const parts = text.split(/(Évora)/g);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part === 'Évora') {
          return (
            <a
              key={index}
              href={evoraLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline underline-offset-4 transition-all ${className}`}
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}
