"use client";

import React, { useEffect, useState } from "react";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Bookmark,
  Calendar,
  MapPin,
  Link2
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock user profile data
const profileData = {
  username: "johndoe",
  displayName: "John Doe",
  bio: "Software developer passionate about UI/UX and modern web technologies",
  avatar: "/api/placeholder/150/150",
  joinDate: "January 2023",
  location: "San Francisco, CA",
  website: "johndoe.dev",
  stats: {
    posts: 127,
    followers: 1432,
    following: 531,
    likes: 3842
  }
};

// Mock feed posts
const generateMockPosts = (count: number) => {
  const users = [
    { username: "alice_dev", displayName: "Alice Developer", avatar: "/api/placeholder/150/150" },
    { username: "bob_designer", displayName: "Bob Designer", avatar: "/api/placeholder/150/150" },
    { username: "carol_pm", displayName: "Carol Product", avatar: "/api/placeholder/150/150" },
    { username: "dave_data", displayName: "Dave Data", avatar: "/api/placeholder/150/150" },
    { username: "eve_engineer", displayName: "Eve Engineer", avatar: "/api/placeholder/150/150" }
  ];
  
  const posts = [];
  
  for (let i = 1; i <= count; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const likes = Math.floor(Math.random() * 200) + 1;
    const comments = Math.floor(Math.random() * 50);
    const shares = Math.floor(Math.random() * 30);
    const timeAgo = Math.floor(Math.random() * 24) + 1;
    
    posts.push({
      id: i,
      user,
      content: `This is post #${i}. ${Lorem.generateSentences(Math.floor(Math.random() * 3) + 1)}`,
      likes,
      comments,
      shares,
      timeAgo: `${timeAgo}h ago`,
      bookmarked: Math.random() > 0.8
    });
  }
  
  return posts;
};

// Simple Lorem Ipsum generator
const Lorem = {
  words: [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
    "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat",
    "duis", "aute", "irure", "dolor", "in", "reprehenderit", "voluptate", "velit", "esse",
    "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat",
    "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt",
    "mollit", "anim", "id", "est", "laborum", "technology", "development", "design", "experience",
    "interface", "application", "software", "platform", "solution", "innovation", "creative"
  ],
  generateSentences: (count: number) => {
    const sentences = [];
    for (let i = 0; i < count; i++) {
      const wordCount = Math.floor(Math.random() * 15) + 5;
      let sentence = "";
      for (let j = 0; j < wordCount; j++) {
        const word = Lorem.words[Math.floor(Math.random() * Lorem.words.length)];
        sentence += j === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
        sentence += j < wordCount - 1 ? " " : ".";
      }
      sentences.push(sentence);
    }
    return sentences.join(" ");
  }
};

// Profile Card Component
const ProfileCard = ({ profile }: { profile: typeof profileData }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile.avatar} alt={profile.displayName} />
          <AvatarFallback>{profile.displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{profile.displayName}</CardTitle>
          <CardDescription>@{profile.username}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{profile.bio}</p>
        
        <div className="flex items-center text-sm mb-2">
          <Calendar className="h-4 w-4 mr-2 opacity-70" />
          <span>Joined {profile.joinDate}</span>
        </div>
        
        <div className="flex items-center text-sm mb-2">
          <MapPin className="h-4 w-4 mr-2 opacity-70" />
          <span>{profile.location}</span>
        </div>
        
        <div className="flex items-center text-sm mb-4">
          <Link2 className="h-4 w-4 mr-2 opacity-70" />
          <span>{profile.website}</span>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="font-bold">{profile.stats.posts}</div>
            <div className="text-xs opacity-70">Posts</div>
          </div>
          <div>
            <div className="font-bold">{profile.stats.followers}</div>
            <div className="text-xs opacity-70">Followers</div>
          </div>
          <div>
            <div className="font-bold">{profile.stats.following}</div>
            <div className="text-xs opacity-70">Following</div>
          </div>
          <div>
            <div className="font-bold">{profile.stats.likes}</div>
            <div className="text-xs opacity-70">Likes</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Edit Profile</Button>
      </CardFooter>
    </Card>
  );
};

// Feed Post Component
const Post = ({ post }: { post: ReturnType<typeof generateMockPosts>[0] }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarImage src={post.user.avatar} alt={post.user.displayName} />
          <AvatarFallback>{post.user.displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base">{post.user.displayName}</CardTitle>
          <CardDescription>@{post.user.username} · {post.timeAgo}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="flex gap-1">
            <Heart className="h-4 w-4" /> 
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex gap-1">
            <MessageSquare className="h-4 w-4" /> 
            <span>{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex gap-1">
            <Share2 className="h-4 w-4" /> 
            <span>{post.shares}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Bookmark className={`h-4 w-4 ${post.bookmarked ? "fill-current" : ""}`} />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Home Page
export default function Home() {
  const [posts, setPosts] = useState<ReturnType<typeof generateMockPosts>>([]);
  const { ref, inView } = useInView();
  
  // Load initial posts
  useEffect(() => {
    setPosts(generateMockPosts(5));
  }, []);
  
  // Load more posts when bottom is reached
  useEffect(() => {
    if (inView) {
      const newPosts = generateMockPosts(5);
      // Add a slight delay to simulate loading from a server
      setTimeout(() => {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
      }, 500);
    }
  }, [inView]);
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar - Profile */}
        <div className="md:col-span-1">
          <ProfileCard profile={profileData} />
          
          {/* Trending Topics (Optional) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trending Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["#WebDevelopment", "#UXDesign", "#JavaScript", "#ReactJS", "#TailwindCSS"].map(topic => (
                <Badge key={topic} variant="secondary" className="mr-2">{topic}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content - Feed */}
        <div className="md:col-span-2">
          {/* New Post Card */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Create a new post</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full border rounded-md p-2 min-h-24 focus:outline-none focus:ring-2"
                placeholder="What's on your mind?"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Post</Button>
            </CardFooter>
          </Card>
          
          {/* Feed Posts */}
          <div>
            {posts.map(post => (
              <Post key={`${post.id}-${post.user.username}`} post={post} />
            ))}
            
            {/* Loading indicator and intersection observer target */}
            <div ref={ref} className="py-4 text-center">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full" aria-label="Loading more posts..."></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}