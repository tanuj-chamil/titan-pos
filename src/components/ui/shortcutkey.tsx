interface ShortcutKeyProps {
  text: string;
  shortcut: string;
  invert?: boolean;
}

function ShortcutKey(props: ShortcutKeyProps) {
  return (
    <div>
      <div className="flex items-center">
        {props.text !== "" ? <div className="px-2">{props.text}</div> : <></>}
        {!props.invert ? (
          <div className="py-1 px-2 border font-bold rounded-md font-xs scale-75 bg-secondary text-secondary-foreground">
            {props.shortcut}
          </div>
        ) : (
          <div className="py-1 px-2 border font-bold rounded-md font-xs scale-75 bg-primary text-primary-foreground">
            {props.shortcut}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShortcutKey;
