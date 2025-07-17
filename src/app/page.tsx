"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleCreate = async () => {
    await authClient.signUp.email({
      name: username,
      password,
      email,
    });
  };
  return (
    <div>
      <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={handleCreate}>Sign up</Button>
    </div>
  );
}
