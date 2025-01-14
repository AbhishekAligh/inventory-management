export default function WidgetCard(props: {
  icon?: React.FC;
  title: string;
  count: string;
}) {
  const { icon: Icon, title, count } = props;
  return (
    <div className="flex flex-row p-4 bg-[#283A2A] rounded-lg shadow-lg ">
      <div className="text-lg">{!Icon ? null : <Icon />}</div>
      <div className="pl-2">
        <p className="text-xs">{title}</p>
        <p className="text-2xl">{count}</p>
      </div>
    </div>
  );
}

