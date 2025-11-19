'use client'

interface ConfirmProps {
    open: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ open, message, onConfirm, onCancel }: ConfirmProps) {
    if (!open) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/30 z-[999]">
            <div className="bg-[#fafaff] p-4 py-5 shadow-lg max-w-[350px] min-w-[300px] h-fit rounded-lg text-center">
                <p className="text-[13px] tracking-[.2px] leading-[1.52em]">{message}</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={onConfirm}
                        className="py-2 text-[12px] px-4 bg-primary text-[#fafaff] mt-2 rounded-lg hover:brightness-90"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onCancel}
                        className="py-2 text-[12px] px-4 bg-gray-300 text-black mt-2 rounded-lg hover:brightness-90"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
