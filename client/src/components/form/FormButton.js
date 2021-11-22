function FormButton(props) {
  return (
    <div className="my-4">
      <button
        type="submit"
        className={`w-full px-4 py-2 font-bold text-white rounded-full bg-${props.color}-700 hover:bg-${props.color}-900" : "bg-blue-700 hover:bg-blue-900"} focus:outline-none focus:shadow-outline}`}>
        {props.label}
      </button>
    </div>
  )
}

export default FormButton;