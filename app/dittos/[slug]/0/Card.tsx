import Color from "color";

function Card({
  logo,
  title,
  salary,
  tags,
  postedAt,
  color,
}: {
  logo: string;
  title: string;
  salary?: string;
  tags?: string[];
  postedAt: string;
  color: string;
}) {
  return (
    <div
      className={`rounded-4xl w-[320px] h-auto p-1 border border-white/30`}
      style={{
        backgroundColor: color,
        boxShadow: `0 4px 16px 0 ${Color(color).darken(0.15).alpha(0.35).string()}, 0 2px 6px 0 rgba(0,0,0,0.06)`,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        className="bg-white rounded-[28px] p-8 flex flex-col"
        style={{
          boxShadow: `0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)`,
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: logo }}
          style={{ height: "100%", width: "auto" }}
          className="mb-4"
        />

        <h2 className="text-2xl font-bold text-slate-800 font-display leading-tight">
          {title}
        </h2>

        <p className="text-base text-slate-400 font-display font-medium mt-0.5">
          {salary}
        </p>

        <div className="flex align-center mt-4 gap-1">
          {tags?.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="rounded-[10px] border-2 border-gray-200/80 px-3 py-1.5 text-xs uppercase font-semibold text-[#573bcc] isolate"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p
        className="text-center uppercase mt-4 mb-3 text-xs font-semibold"
        style={{ color: Color(color).darken(0.8).alpha(0.5).string() }}
      >
        Posted {postedAt} days ago
      </p>
    </div>
  );
}

export default Card;
