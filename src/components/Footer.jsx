import '../App.css'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>-
        <div>
            &copy; {currentYear} OwlScribe. All Rights Reserved.
        </div>
    </footer>
  )
}
