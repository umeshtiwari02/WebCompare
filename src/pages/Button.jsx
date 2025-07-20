
export default function Button({ children, onClick, firstUrl, secondUrl }) {
    return (
        <>
            <button type="submit"
                onClick={onClick}
                disabled={!firstUrl || !secondUrl}
                className='
                bg-blue-500
                hover:bg-blue-700
                text-white font-bold
                outline-none
                py-2 px-5 rounded
                disabled:opacity-50
                disabled:cursor-not-allowed
                w-[96%] md:w-[20%]
                '>
                {children}
            </button>
        </>
    )
}


export function ShowUrlsButton({ children, onClick, isLoading, }) {
    return (
        <>
            <button type="submit"
                onClick={onClick}
                disabled={isLoading}
                className='
                bg-blue-500
                hover:bg-blue-700
                text-white font-bold
                outline-none
                mt-6 mb-5
                py-2 px-5 rounded
                disabled:opacity-50
                disabled:cursor-not-allowed
                w-[96%] md:w-[20%]
                '>
                {children}
            </button>
        </>
    )
}
