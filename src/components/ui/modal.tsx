type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, onClose, children }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-lg">
        {children}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-red-400 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;