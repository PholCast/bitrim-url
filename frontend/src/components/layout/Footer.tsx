
export const Footer = () => {
  return (
    <footer className='flex items-center justify-between py-12   px-24 border-t border-t-[#ffffff0d] bg-dark text-sm'>
      <div className="flex flex-col items-start gap-6">
        <div className='flex items-center'>
        <div className="bg-primary inline-block rounded-lg p-1 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" /></svg>
        </div>
        <span className="text-xl font-extrabold">BiTrimURL</span>
        </div>
        <p className='text-slate-500'>© 2026 Shorten.it. Open Source Utility.</p>
      </div>
      <div className='flex justify-center items-center gap-8 text-slate-400'>
        <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo">Privacy Policy</a>
        <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo">Terms of service</a>
        <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo">API docs</a>
      </div>
      <div>
        <span className=' text-slate-400'>Made with ❤️ by Pholcast</span>
      </div>
    </footer>
  )
}
