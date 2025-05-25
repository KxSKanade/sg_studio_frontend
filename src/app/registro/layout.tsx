import Navbar from '../../../components/Navbar';

export default function RegistroLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}