import "./button.css"

export default function Button() {
  const handleClick = () => {
    console.log("Button clicked!")
  }

  return (
    <button className="animated-btn" onClick={handleClick}>
      export
    </button>
  )
}
