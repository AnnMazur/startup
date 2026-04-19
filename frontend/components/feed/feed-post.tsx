"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Tag, Lightbulb, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FeedPost as FeedPostType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FeedPostProps {
  post: FeedPostType;
  variant?: "default" | "featured";
}

const typeConfig = {
  collection: {
    icon: Sparkles,
    label: "Подборка",
    color: "bg-primary/10 text-primary",
  },
  promo: {
    icon: Tag,
    label: "Акция",
    color: "bg-[#FFB142]/10 text-[#FFB142]",
  },
  idea: {
    icon: Lightbulb,
    label: "Идея",
    color: "bg-[#9FD0A3]/20 text-[#5A8A5E]",
  },
  venue: {
    icon: Building2,
    label: "Площадка",
    color: "bg-secondary text-secondary-foreground",
  },
};

export function FeedPost({ post, variant = "default" }: FeedPostProps) {
  const config = typeConfig[post.type];
  const Icon = config.icon;

  return (
    <Link href={post.linkUrl || "#"}>
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          "border-border bg-card",
          variant === "featured" && "md:flex md:flex-row"
        )}
      >
        {/* Image */}
        <div
          className={cn(
            "relative overflow-hidden",
            variant === "default" ? "aspect-[16/9]" : "aspect-[16/9] md:aspect-auto md:w-1/2"
          )}
        >
          <Image
            src={post.images[0]}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={
              variant === "featured"
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

          {/* Type badge */}
          <Badge
            className={cn(
              "absolute left-3 top-3 gap-1.5",
              config.color
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {config.label}
          </Badge>
        </div>

        {/* Content */}
        <CardContent
          className={cn(
            "flex flex-col p-4",
            variant === "featured" && "md:w-1/2 md:justify-center md:p-6"
          )}
        >
          <h3
            className={cn(
              "font-semibold text-foreground line-clamp-2 text-balance",
              variant === "featured" ? "text-xl md:text-2xl" : "text-lg"
            )}
          >
            {post.title}
          </h3>

          <p
            className={cn(
              "mt-2 text-muted-foreground",
              variant === "featured"
                ? "text-base line-clamp-3"
                : "text-sm line-clamp-2"
            )}
          >
            {post.description}
          </p>

          {post.linkText && (
            <Button
              variant="link"
              className="mt-4 h-auto w-fit gap-2 p-0 text-primary hover:text-accent"
            >
              {post.linkText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
