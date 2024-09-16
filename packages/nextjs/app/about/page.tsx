"use server";

import Link from "next/link";
import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About Blockchain GitHub Issues</h1>
      <p className="text-lg mb-4">
        Welcome to <strong>Blockchain GitHub Issues</strong>, your go-to platform for tracking blockchain-related
        issues! The goal of this website is to provide an efficient way to monitor open issues across blockchain
        projects hosted on GitHub.
      </p>
      <p className="text-lg mb-4">
        Whether you&apos;re a developer, contributor, or enthusiast, our platform helps you stay up to date with the
        latest issues and developments in blockchain technology. We gather information from a wide range of repositories
        to keep you informed about emerging challenges, bugs, good first issues and potential areas for contribution.
        Explore the latest issues, submit your own repositories, and become part of the solution in shaping the future
        of blockchain!
      </p>
      <Link
        href={"https://forms.gle/1F5LbgVUt4aEcJ9o7"}
        rel="noopener noreferrer"
        target="_blank"
        className="text-blue-500 hover:underline mr-10"
      >
        Submit your repo
      </Link>
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default About;
