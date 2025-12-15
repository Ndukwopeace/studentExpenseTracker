export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className=" flex flex-col bg-white rounded-xl p-5 w-[90%] max-w-md">
        <button
          className="text-right text-red-500 mb-2 self-end"
          onClick={onClose}
        >
          close
        </button>

        {children}
      </div>
    </div>
  );
}
