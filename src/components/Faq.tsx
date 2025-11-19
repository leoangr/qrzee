export default function FAQ() {

    const questions = [
        {
            questions: "What is a QR code?",
            answer: "A QR code is a type of barcode that stores information such as links, text, or contact details. When scanned, it instantly directs users to the intended content."
        },
        {
            questions: "What types of QR codes can I create?",
            answer: "With QRzee, you can create static or dynamic QR codes for links, text"
        },
        {
         questions: "Do I need to create an account to use QRzee?",
         answer: "No account is required to generate QR codes instantly, but signing up lets you manage and edit your dynamic codes anytime."
        }
    ]

    return (
        <div className="flex flex-col max-w-[740px] my-16 mx-auto p-3">
            <h2 className="text-[1.3rem] text-center text-[#161616] font-bold mb-10 ">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-8">
                {questions.map((item, index) => {
                    return (
                        <div key={index} className="flex flex-col gap-4">
                            <p className="text-[1rem] font-semibold ">{item.questions}</p>
                            <span className="text-[14.5px] text-[#161616] leading-[1.52em] tracking-[.2px] ">{item.answer}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}