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
        boxShadow: `0 1px 4px 0 ${Color(color).darken(0.2).alpha(0.8)}, 0 1px 6px 0 rgba(0, 0, 0, 0.1)`,
      }}
    >
      <div
        className="bg-white rounded-[28px] p-8 flex flex-col"
        style={{
          boxShadow: `0 1px 1px 0 ${Color(color).darken(0.2).alpha(0.8)}, 0 1px 4px 0 rgba(0, 0, 0, 0.05)`,
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: logo }}
          style={{ height: "100%", width: "auto" }}
          className="mb-4"
        />

        <h2 className="text-xl font-bold text-blue-900 font-display">
          {title}
        </h2>
        <p className="text-lg text-gray-500 font-display font-semibold">
          {salary}
        </p>

        <div className="flex align-center mt-4 gap-0.5">
          {tags?.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="rounded-[10px] border-2 border-gray-200/80 px-3 py-1.5 text-xs uppercase font-semibold text-violet-800 shadow-xs"
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
