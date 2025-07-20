export default function InputField({ placeholder, value, onChange }) {
    return (
        <>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='
                bg-gray-100
                dark:bg-gray-700
                hover:bg-gray-300
                dark:hover:bg-slate-500
                mt-5 md:mt-0
                outline-none
                dark:text-gray-100
            p-2 border-none
            w-[96%] md:w-[35%]
            rounded-md'
            />
        </>
    )
}
