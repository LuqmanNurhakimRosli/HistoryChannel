import '../App.css'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
        <div>
            &copy; {currentYear} Diary Cat. All Eyes on Cat.
        </div>
    </footer>
  )
}
