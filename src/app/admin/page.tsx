"use client";
import MarkdownRender from "@/components/markdown-render";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addLesson } from "@/db/queries/actions";
import { useUserRole } from "@/hooks/use-user-role";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [courseId, setCourseId] = useState(
    localStorage.getItem("last-used-course-id") ?? ""
  );
  const [activeTab, setActiveTab] = useState("editor");
  const { isAdmin, loading } = useUserRole();

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center bg-foreground flex-col gap-6">
        <h2 className="font-bold text-3xl text-white">Authorizing</h2>
        <Loader2 className="animate-spin text-white size-8" />
      </div>
    );

  if (!isAdmin) redirect("/");

  const handleCreateLesson = async () => {
    localStorage.setItem("last-used-course-id", courseId);
    await addLesson(title, content, courseId, videoUrl);
    setTitle("");
    setContent("");
    setVideoUrl("");
  };

  return (
    <div className="p-4">
      <Button onClick={() => setActiveTab("editor")}>editor</Button>
      <Button onClick={() => setActiveTab("preview")}>preview</Button>
      {activeTab === "editor" ? (
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Course ID"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Lesson Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Lesson Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Lesson Video URL (optional)"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <Button onClick={handleCreateLesson}>Create Lesson</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex flex-col gap-4">
              <h2 className="text-xs text-gray-500">Preview</h2>
              <h2 className="font-medium text-2xl text-black">{title}</h2>
              <MarkdownRender content={content} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
