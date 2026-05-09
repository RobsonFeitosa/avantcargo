"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock, User, Loader2, AlertCircle } from "lucide-react";
import { authActions } from "@/admin/actions/auth.actions";
import { useAuth } from "@/admin/hooks_generic/providers/auth";

const loginSchema = z.object({
  name: z.string().min(1, "O nome de usuário é obrigatório"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function Login() {
  const { signIn } = useAuth();
  
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: LoginValues) => authActions.authenticate(data),
    onSuccess: (data) => {
      signIn(data.result);
      toast.success("Login realizado com sucesso!");
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  function onSubmit(values: LoginValues) {
    mutation.mutate(values);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-50/30 p-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="space-y-1 bg-emerald-600 text-white rounded-t-xl py-8 text-center">
          <CardTitle className="text-3xl font-bold">AvantCargo</CardTitle>
          <CardDescription className="text-emerald-50">
            Painel Administrativo
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 px-8 pb-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {mutation.isError && (
                <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Erro de acesso</AlertTitle>
                  <AlertDescription className="text-xs">
                    Usuário ou senha incorretos. Por favor, tente novamente.
                  </AlertDescription>
                </Alert>
              )}
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-emerald-950 font-semibold">Nome de Usuário</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-emerald-600/50" />
                        <Input
                          placeholder="Digite seu nome de usuário"
                          className="pl-10 border-emerald-100 focus-visible:ring-emerald-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-emerald-950 font-semibold">Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-emerald-600/50" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 border-emerald-100 focus-visible:ring-emerald-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 shadow-lg shadow-emerald-600/20"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Acessar Painel"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
