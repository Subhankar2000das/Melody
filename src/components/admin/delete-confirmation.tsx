import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteConfirmation = ({
  open,
  title = "Delete item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  isLoading = false,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-400">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Deleting..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;