import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft, Calendar } from 'lucide-react';
import { BlogPost } from '@/types/schema';
import { PersonAvatar } from '@/components/common/PersonAvatar';
import { Badge } from '@/components/ui/badge';
import { toPersianDigits } from '@/lib/formatters';

export interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className = '' }: BlogCardProps) {
  return (
    <article
      className={`group flex flex-col rounded-2xl bg-white border border-border shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated hover:border-accent/40 overflow-hidden ${className}`}
    >
      <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Cover Image 16:9 */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 start-3">
            <Badge variant="primary" size="sm" className="shadow-xs font-semibold">
              {post.category}
            </Badge>
          </div>
          <div className="absolute bottom-3 end-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-accent-300" />
            <span>{toPersianDigits(post.readingTime)} دقیقه مطالعه</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col flex-1 p-5 space-y-3">
          <h3 className="text-base font-bold text-primary-900 group-hover:text-accent-700 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          {/* Footer with Author and Date */}
          <div className="mt-auto pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <PersonAvatar
                name={post.author.name}
                src={post.author.avatar}
                className="w-6 h-6 rounded-full border border-border text-[10px]"
                imgClassName="w-6 h-6 rounded-full object-cover border border-border"
              />
              <span className="font-semibold text-foreground text-xs">{post.author.name}</span>
            </div>

            <div className="flex items-center gap-1 font-sans text-[11px]">
              <Calendar className="w-3 h-3 text-accent-600" />
              <span>{toPersianDigits(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
