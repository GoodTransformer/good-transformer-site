type PageIntroProps = {
  title: string;
  body: string;
};

export function PageIntro({ title, body }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="mx-auto max-w-7xl px-6 pb-8 md:px-10 lg:px-12">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl leading-tight text-ink text-pretty md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate text-pretty md:text-lg">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
