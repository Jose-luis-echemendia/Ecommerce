import { XCircleIcon } from "@heroicons/react/24/outline"

export const Modal = ({ open, onClose, children }) =>{
 
    return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors z-50
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={(e)=>(e.preventDefault(), onClose())}
          className="absolute top-2 right-2 p-2 rounded-lg text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-900"
        >
          <XCircleIcon className="w-5 h-5"/>
        </button>
        {children}
      </div>
    </div>
  )
}
