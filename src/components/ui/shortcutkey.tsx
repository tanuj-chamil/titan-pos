interface ShortcutKeyProps {
    text : string;
    shortcut : string;
}


function ShortcutKey(props : ShortcutKeyProps) {
  return (
    <div>
      <div className="flex items-center">
        {props.text !== "" ? (<div className="px-2">{props.text}</div>) :(<></>)}
        <div className="py-1 px-2 border font-bold rounded-md font-xs scale-75">
          {props.shortcut}
        </div>
      </div>
    </div>
  );
}

export default ShortcutKey;
