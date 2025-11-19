'use client'

interface alertProps {
    open: boolean,
    message: string,
    onClose: any
}

export default function AlertModal({ open, message, onClose } : alertProps ) {
  if (!open) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center alert-box p-[14px]] z-[999] ">
        <div className="bg-[#fafaff] p-4 py-5 shadow-lg max-w-[350px] min-w-[300px] h-fit rounded-lg ">
            <p className="text-[13px] tracking-[.2px] leading-[1.52em] text-center ">{message}</p>
            <div className="flex justify-center">
                <button
                onClick={onClose}
                className="py-2 text-[12px] p-4 bg-primary text-[#fafaff] mt-2 rounded-lg hover:brightness-90 ">
                OK
                </button>
            </div>
        </div>
    </div>
  );
}
