export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <section className="bg-gray-900 pt-8 px-3">
            <footer className="flex flex-col max-w-[1240px] mx-auto ">
                <div className="flex flex-col gap-4 items-center justify-center sm:items-start sm:justify-start ">
                    <img
                    className="w-[90px] sm:w-[100px] object-contain"
                    src="/images/QRzee.png"
                    alt="logo"
                    />
                    <span className="text-gray-500 tracking-[.2px] leading-[1.52em] text-[15px] ">Generate & Publish Dynamic QR Codes</span>
                </div>
                <p className="text-[14px] leading-[1.52em] tracking-[.2px] py-4 mt-8 text-gray-600 text-center border-t border-t-gray-800 ">@ {year} QRzee. All Rights Reserved</p>
            </footer>
        </section>
    )
}