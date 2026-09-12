CLAUDE.md — blueberry-pi

Context for Claude Code working in this repo. Read this before doing anything else.

## How I want you to work with me

I am building this myself, on purpose, to actually learn Go and get comfortable with Kubernetes internals (client-go, RBAC, CRDs). That changes how you should help:

- Do not write whole files or complete implementations for me. Explain the concept, point me at the relevant client-go/Kubernetes API or React pattern, and let me write the code myself.
- Short illustrative snippets (a few lines, to show a shape or a signature) are fine. A finished handler, component, or manifest is not — that's mine to type.
- If something I wrote is broken, tell me where and why. Don't silently patch it unless I explicitly ask you to fix it for me.
- Prefer explaining trade-offs ("why patch .operation instead of calling ArgoCD's API", "why a ClusterRole + per-namespace RoleBindings instead of one cluster-wide grant") over just handing me the answer.
- It's fine to review code I've written and critique it — that's the "code review, don't write it" mode, and I'll ask for that explicitly when I want it.
- If I get stuck and explicitly ask you to just write something, that's my call to make in the moment — but default to teaching, not doing.

## What this project is

blueberry-pi — a small, custom homelab dashboard for a Kubernetes cluster running on a Raspberry Pi 5 (8GB RAM). I already have kubectl and a cluster running; I'm adding ArgoCD for GitOps (auto-apply manifests on git push) and building this dashboard because the existing options (Homepage, Headlamp) don't look the way I want and this is more fun to build myself anyway.

It needs to do two things existing dashboards don't combine well:

1. Show ArgoCD application health/sync status alongside live Kubernetes Deployment/Pod state, in one place.
2. Let me actually act on the cluster from the UI — restart a Deployment, scale it, trigger an ArgoCD sync — not just look at it.

## Architecture

- Backend: Go. Talks to the Kubernetes API via client-go (typed clientset for Deployments/Pods) and a dynamic.Interface client for ArgoCD's Application custom resource (no generated types exist for CRDs, so this is the normal way to touch them). Plain net/http with Go 1.22's method+path pattern matching in http.ServeMux — no router library needed.
- Frontend: React + Vite + TypeScript + Tailwind CSS.
- Packaging: one container image. Multi-stage build — the frontend's dist/ gets copied into the Go module and embedded into the binary via //go:embed, so it ships as a single process serving both the API and the static UI.
- Deployment target: the Pi's cluster, linux/arm64 — container images need to be built for that platform (docker buildx --platform linux/arm64).
- Distribution: deployed via Kubernetes manifests that live in this repo and that ArgoCD watches — this app manages its own future deploys via GitOps, same as everything else on the cluster.
- Auth: one shared bearer token, passed as an env var from a Kubernetes Secret, checked on every /api/* request. Deliberately simple — this thing lives on the LAN/behind Tailscale, not the open internet.

## Key technical decisions (and why)

- ArgoCD sync without an ArgoCD API token: triggering a sync is a PATCH on the Application resource's .operation field via the Kubernetes API (that's literally what argocd app sync does under the hood), not a call to ArgoCD's own REST/gRPC server. That means the only credential the dashboard needs is Kubernetes RBAC on the applications.argoproj.io CRD — no separate long-lived ArgoCD token to create, store, or rotate.
- Restart = patch, not delete: a rolling restart is a patch to an annotation on the pod template (changes the pod-spec hash, so the Deployment controller rolls new pods) — the same mechanism kubectl rollout restart uses, rather than deleting pods directly.
- RBAC shape: a ClusterRole defines what the dashboard's ServiceAccount can do (get/list/watch/patch on Deployments and Pods; get/list/watch/patch on Applications); per-namespace RoleBindings define where. Adding a namespace to watch is one more RoleBinding, not a bigger grant. No cluster-admin, anywhere.

## Repo layout (target — build it out as you go)

```
backend/     Go API server
frontend/    React + Vite + Tailwind SPA
deploy/      Kubernetes manifests: Namespace, ServiceAccount, RBAC,
             Deployment, Service, optional Ingress, and the ArgoCD
             Application resource itself
Dockerfile   multi-stage build (frontend -> embedded into the Go binary)
```

## Environment specifics

- Raspberry Pi 5, 8GB RAM, arm64.
- Kubernetes distro on the Pi: <fill in — k3s / k0s / kubeadm>
- ArgoCD namespace: argocd (default install namespace)
- Local dev: the backend should fall back to ~/.kube/config when there's no in-cluster config available, so it can run on my laptop against the same cluster while I iterate. The frontend dev server should proxy /api to the backend's port so there's no CORS to deal with locally.

## Commands

<fill in as the project takes shape, e.g.:>

- cd backend && go build ./...
- cd backend && go test ./...
- cd frontend && npm run dev
- cd frontend && npm run build
- docker buildx build --platform linux/arm64 -t <tag> --push .

## Progress log

Keep this updated as you go — it's what gives you (Claude Code) continuity between sessions on what's actually done vs. still planned.

- [ ] Backend: Kubernetes client setup (in-cluster + kubeconfig fallback)
- [ ] Backend: list Deployments / Pods
- [ ] Backend: restart / scale a Deployment
- [ ] Backend: list ArgoCD Applications / trigger sync
- [ ] Backend: token auth middleware
- [ ] Frontend: token gate + API client
- [ ] Frontend: ArgoCD apps view
- [ ] Frontend: Deployments table
- [ ] Frontend: Pods list
- [ ] Dockerfile + arm64 build
- [ ] Kubernetes manifests + RBAC
- [ ] ArgoCD Application wired up, GitOps loop confirmed working end to end
