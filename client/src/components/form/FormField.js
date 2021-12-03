import classnames from "classnames";

function FormField(props) {
  return (
    <div className="my-4">
      <label className="block mb-2 text-sm font-bold text-gray-300">
        {props.label}
      </label>
      {props.isarea ?
        <textarea className={classnames("form-textarea block mt-1 shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {})} /> :
        <input className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {})} />
      }
    </div>
  )
}

export default FormField;