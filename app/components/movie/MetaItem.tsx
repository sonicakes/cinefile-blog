const MetaItem = ({
  Icon,
  text,
  fullWidth,
}: {
  Icon: any;
  text: string;
  fullWidth?: boolean;
}) => {
  return (
    <div className={`flex gap-1 items-center ${fullWidth ? "w-full" : ""}`}>
      <Icon color="crimson" size="20" /> {text}
    </div>
  );
};

export default MetaItem;
