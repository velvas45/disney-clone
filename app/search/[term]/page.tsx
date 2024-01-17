import { notFound } from "next/navigation";

type Props = {
  params: {
    term: string;
  };
};

function SearchPage({ params: { term } }: Props) {
  if (!term) notFound();

  const termToUse = decodeURI(term);

  // TODO: API CALL TO GET THE SEARCHED MOVIES

  //   TODO: API CALL TO GET THE POPULAR MOVIES

  return <div>Welcome to the search page: {termToUse}</div>;
}

export default SearchPage;
