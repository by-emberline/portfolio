import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Star, ShieldCheck, LogOut, ArrowLeft } from "lucide-react";
import { useListReviewsQuery, useDeleteReview, getListReviewsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN ?? "esther2025";

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState(false);
  const [, setLocation] = useLocation();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/8 blur-[150px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!authed ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex items-center justify-center p-6"
          >
            <div className="glass-panel rounded-3xl p-10 w-full max-w-sm text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={28} className="text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-1">Admin Panel</h1>
              <p className="text-muted-foreground text-sm mb-8">Enter your PIN to continue</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  data-testid="input-admin-pin"
                  type="password"
                  value={pin}
                  onChange={(e) => { setPin(e.target.value); setError(false); }}
                  placeholder="Enter PIN"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-center text-lg tracking-[0.4em] text-white placeholder:tracking-normal placeholder:text-muted-foreground/40 focus:outline-none transition-all ${error ? "border-destructive/60 shake" : "border-white/10 focus:border-primary/50"}`}
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-destructive text-sm"
                  >
                    Incorrect PIN. Try again.
                  </motion.p>
                )}
                <button
                  data-testid="button-admin-login"
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Unlock
                </button>
              </form>
              <button
                onClick={() => setLocation("/")}
                className="mt-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
              >
                <ArrowLeft size={14} /> Back to portfolio
              </button>
            </div>
          </motion.div>
        ) : (
          <AdminDashboard key="dashboard" onLogout={() => setAuthed(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { data: reviews, isLoading } = useListReviews();
  const deleteReview = useDeleteReview();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function handleDelete(id: number) {
    setDeletingId(id);
    deleteReview.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListReviewsQueryKey() });
          setDeletingId(null);
        },
        onError: () => setDeletingId(null),
      }
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-10 relative z-10"
    >
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-1">
            <ShieldCheck size={14} />
            Admin Panel
          </div>
          <h1 className="text-3xl font-bold">Manage Reviews</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-xl glass-card"
          >
            <ArrowLeft size={14} /> Portfolio
          </button>
          <button
            data-testid="button-admin-logout"
            onClick={onLogout}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors px-4 py-2 rounded-xl glass-card"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-6 animate-pulse h-32" />
          ))}
        </div>
      ) : !reviews || reviews.length === 0 ? (
        <div className="glass-panel rounded-3xl p-16 text-center">
          <Star size={32} className="text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No client reviews yet.</p>
          <p className="text-muted-foreground/50 text-sm mt-1">Reviews submitted through your portfolio will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">{reviews.length} review{reviews.length !== 1 ? "s" : ""} submitted by clients</p>
          <AnimatePresence>
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="glass-card rounded-2xl p-6 flex items-start gap-4"
                data-testid={`admin-review-${review.id}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-semibold text-white">{review.name}</span>
                    {review.company && (
                      <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                        {review.company}
                      </span>
                    )}
                    <div className="flex gap-0.5 ml-auto">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} size={12} className="text-primary fill-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed truncate">"{review.quote}"</p>
                  <p className="text-xs text-muted-foreground/40 mt-2">
                    {new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </div>
                <button
                  data-testid={`button-delete-review-${review.id}`}
                  onClick={() => handleDelete(review.id)}
                  disabled={deletingId === review.id}
                  className="p-2.5 rounded-xl hover:bg-destructive/20 hover:text-destructive text-muted-foreground/50 transition-all disabled:opacity-40 flex-shrink-0"
                >
                  {deletingId === review.id ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin block" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
