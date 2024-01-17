import React from "react";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};

const GenrePage = ({ params: { id }, searchParams: { genre } }: Props) => {
  return (
    <div>
      Welcome to the Genre with ID: {id} and name: {genre}
    </div>
  );
};

export default GenrePage;
