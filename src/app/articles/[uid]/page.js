import Link from "next/link";
import * as prismic from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { HorizontalDivider } from "@/components/HorizontalDivider";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function LatestArticle({ article }) {
  const date = prismic.asDate(
    article.data.publishDate || article.first_publication_date,
  );

  return (
    <li>
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
        <PrismicNextLink document={article}>
          <PrismicText field={article.data.title} />
        </PrismicNextLink>
      </h1>
      <p className="font-serif italic tracking-tighter text-slate-500">
        {dateFormatter.format(date)}
      </p>
    </li>
  );
}

export async function generateMetadata({ params }) {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const article = await client
    .getByUID("article", params.uid)
    .catch(() => notFound());

  return {
    title: `${prismic.asText(article.data.title)} | ${prismic.asText(
      settings.data.name,
    )}`,
    description: article.data.meta_description,
    openGraph: {
      title: article.data.meta_title,
      images: [
        {
          url: article.data.meta_image.url,
        },
      ],
    },
    alternates: {
      canonical: `https://audiopoablog.vercel.app/articles/${article.uid}`
    },
    twitter: {
      card: 'summary_large_image',
      title: article.data.meta_title,
      description: article.data.meta_description,
      siteId: '1467726470533754880',
      creator: '@audiopoa',
      creatorId: '1467726470533754880',
      images: [`https://audiopoablog.vercel.app/articles/${article.uid}`], // Must be an absolute URL
    },
  };
}

export default async function Page({ params }) {
  const client = createClient();

  const article = await client
    .getByUID("article", params.uid)
    .catch(() => notFound());
  const latestArticles = await client.getAllByType("article", {
    limit: 3,
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  const date = prismic.asDate(
    article.data.publishDate || article.first_publication_date,
  );

  return (
    <Layout
      navigation={navigation}
      withHeaderDivider={false}
      withProfile={false}
      settings={settings}
    >
      <Bounded>
        <Link href="/" className="font-semibold tracking-tight text-slate-400">
          &larr; Voltar aos artigos
        </Link>
      </Bounded>
      <article>
        <Bounded className="pb-0">
          <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
            <PrismicText field={article.data.title} />
          </h1>
          <p className="font-serif italic tracking-tighter text-slate-500">
            {dateFormatter.format(date)}
          </p>
        </Bounded>
        <SliceZone slices={article.data.slices} components={components} />
      </article>
      {latestArticles.length > 0 && (
        <Bounded>
          <div className="grid grid-cols-1 justify-items-center gap-16 md:gap-24">
          <Link className="bg-orange-300 text-white font-bold py-2 px-4 rounded"
          href="https://wa.me/5551999446108?text=Ol%C3%A1.+Encontrei+a+loja+no+blog.+Gostaria+de+visitar+o+showroom."
          target="_blank"
          >Visite nosso showroom hoje mesmo!
          </Link>
            <HorizontalDivider />
            <div className="w-full">
              <Heading size="2xl" className="mb-10">
                Últimos Artigos
              </Heading>
              <ul className="grid grid-cols-1 gap-12">
                {latestArticles.map((article) => (
                  <LatestArticle key={article.id} article={article} />
                ))}
              </ul>
            </div>
          </div>
        </Bounded>
      )}
    </Layout>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const articles = await client.getAllByType("article");

  return articles.map((article) => {
    return { uid: article.uid };
  });
}
