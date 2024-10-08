import './Tag.css';

type TagProps = {
  text: string;
}

function Tag({ text }: TagProps) {
  return (
    <div className="tag">
      {text}
    </div>
  )
}

export default Tag;
