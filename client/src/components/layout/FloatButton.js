function FloatButton(props) {
  return (
    <a
      href={props.url}
      class="justify-center items-center">
      <div class={`h-14 w-14 m-1.5 rounded-lg border-4 ${props.iscurrentcourse ? "border-green-300 hover:border-green-100" : "border-double border-blue-900 hover:border-green-300"} ${props.bgcolor} focus:border-gray-100`}>
        <h1 class={`break-words p-1 ${props.isaddbtn ? "relative text-3xl font-bold font-serif" : "text-sm font-semibold"} text-center text-yellow-200 focus:text-gray-100"`}>{props.label}</h1>
      </div>
    </a>
  )
}

export default FloatButton;