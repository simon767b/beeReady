import List from "../components/List";
import PlusButton from "../components/PlusButton";

export default function Lister() {
  return (
    <>
      <main className="lister">
        <form>
          <div>
            <img className="search" src="img\icons\search.svg" alt="Søg ikon" />
            <input type="search" placeholder="Søg" />
          </div>
          <button>
            Sortér <img src="img\icons\down-arrow.svg" alt="drop-down pil" />
          </button>
        </form>
        <section className="beehive">
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <PlusButton></PlusButton>
        </section>
        <div className="gradient"></div>
      </main>
    </>
  );
}
