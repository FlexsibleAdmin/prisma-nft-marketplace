import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Upload, Image as ImageIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api-client";
import type { NFT } from "@shared/types";
import { toast } from "sonner";
const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Please enter a valid image URL"),
  price: z.coerce.number().min(0.001, "Price must be greater than 0"),
  collection: z.string().min(2, "Collection name is required"),
});
type FormValues = z.infer<typeof formSchema>;
export function CreateNFTPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    // Fix TS2322: Cast resolver to any to bypass strict type mismatch between zod output and RHF expectations
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
      collection: "",
    },
  });
  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <div className="h-16 w-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">Connect Wallet to Create</h2>
        <p className="text-muted-foreground max-w-md">
          You need to connect your wallet to mint new NFTs on the Prisma marketplace.
        </p>
        <Button onClick={() => navigate("/")} variant="outline">
          Go Home
        </Button>
      </div>
    );
  }
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        artist: user?.name || "Unknown Artist",
        owner: user?.id,
        avatar: user?.avatar,
      };
      const created = await api<NFT>('/api/nfts', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      toast.success("NFT minted successfully!");
      navigate(`/assets/${created.id}`);
    } catch (error) {
      console.error("Failed to create NFT:", error);
      toast.error("Failed to mint NFT. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Create New NFT</h1>
        <p className="text-muted-foreground mt-2">
          Mint your digital creation to the Prisma blockchain.
        </p>
      </div>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
            <CardDescription>
              Provide the metadata for your new digital asset.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Input placeholder="https://..." {...field} />
                          {field.value && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                              <img
                                src={field.value}
                                alt="Preview"
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                                }}
                              />
                            </div>
                          )}
                          {!field.value && (
                            <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed bg-muted/50">
                              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <ImageIcon className="h-8 w-8" />
                                <span>Image preview will appear here</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter a direct link to your image file (JPG, PNG, GIF).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Cosmic Perspective #1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="collection"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Collection</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Cosmic Voyages" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (ETH)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.001" placeholder="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your NFT..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-violet-600 hover:shadow-glow transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Minting...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Create NFT
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}