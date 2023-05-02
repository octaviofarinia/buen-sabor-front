import { useLocation, useParams } from "react-router-dom";

export const Detail = () => {
  const { Name, id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const editable = params.get('editable') === 'true';
  return (
    <div className="p-6">
      <h5 className="mb-3 text-lg font-bold">White city</h5>
      <p className="mb-4 pb-2">
        Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat
        vulputate. Ut vulputate est non quam dignissim elementum. Donec a
        ullamcorper diam.
      </p>
      {editable?<p>EDITABLE</p>:<p>NOEDITABLE</p>}
      <a
        href="#!"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="inline-block rounded-full bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
      >
        Read more
      </a>
    </div>
  );
};
