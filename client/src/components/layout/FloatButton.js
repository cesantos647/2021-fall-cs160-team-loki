function FloatButton(props) {
  return (
    <a
      href={props.url}
      className="items-center justify-center">
      <div className={`group hover:opacity-90 h-14 w-14 m-1.5 rounded-lg hover:rounded-full border-4 ${props.isselected ? "border-green-300 hover:border-green-100" : "border-double border-blue-900 hover:border-green-300"} bg-${props.bgcolor}-600 focus:border-gray-100`}>
        <h1 className={`group-hover:text-white break-words p-1 ${props.isaddbtn ? "relative text-3xl font-bold font-serif" : "text-sm font-semibold"} text-center text-yellow-200 focus:text-gray-100"`}>{props.label}</h1>
      </div>
    </a>
  )
}

export default FloatButton;