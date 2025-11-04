import React, { useEffect, useState, useRef } from "react";
import { Repo } from "../interfaces/types";
import RepoCard from "../components/RepoCard";
import { fetchRepos } from "../services/githubService";

const HomePage: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);

  const loadRepos = async (pageNum: number) => {
    setLoading(true);
    const newRepos = await fetchRepos(pageNum);
    setRepos((prev) => [...prev, ...newRepos.items]);
    setLoading(false);
  };

  useEffect(() => {
    loadRepos(page);
  }, [page]);

  // Infinite scroll using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "20px", threshold: 1.0 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Trending Repos
      </h1>

      <div className="flex flex-col gap-4">
        {repos.map((r) => (
          <RepoCard key={r.id} repo={r} />
        ))}
      </div>

      <div ref={loader} className="h-10 flex justify-center items-center">
        {loading && <p>Loading more repos...</p>}
      </div>
    </div>
  );
};

export default HomePage;
