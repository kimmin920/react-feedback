export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="sticky top-0 bg-background text-foreground">
      {children}
    </section>
  );
}
