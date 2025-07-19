### **GitHub Action: 1Panel Container Upgrader**  

**🚀 Automatically upgrade containers using 1Panel's API**  

This GitHub Action allows you to **seamlessly upgrade Docker containers** managed by https://1panel.pro/ via its API. It supports **custom API versions** (e.g., `v1`, `v2`) and **flexible image tagging** (versions, `latest`, or SHA256 digests).  

### **🔹 Key Features**  
✅ **Supports 1Panel API versions** – Works with `v1`, `v2`, or any custom API path.  
✅ **Flexible image versions** – Specify tags (`v1.2.0`), `latest`, or SHA256 digests.  
✅ **Secure authentication** – Uses 1Panel’s token-based API security.  
✅ **Error handling & logging** – Provides clear success/failure feedback in workflows.  
✅ **Easy integration** – Just plug in your 1Panel host, API key, and container details.  

### **📥 Usage Example**  
```yaml
- uses: persiliao/1panel-upgrade-container-action@v1
  with:
    panel-api-key: ${{ secrets.PANEL_API_KEY }}
    panel-host: "https://1panel.example.com"
    api-version: "v2"  # Optional (default: v2)
    container-name: "my-app"
    image-repo: "ghcr.io/my-org/app"
    image-version: "v1.2.0"  # or "sha256:abcd..."
```

### **⚙️ Inputs**  
| Parameter        | Required | Default  | Description                                             |
|------------------|----------|----------|---------------------------------------------------------|
| `panel-api-key`  | ✅        | -        | 1Panel API key (store in GitHub Secrets).               |
| `panel-host`     | ✅        | -        | 1Panel server URL (e.g., `https://1panel.example.com`). |
| `api-version`    | ❌        | `v2`     | 1Panel API version (e.g., `v1`, `v2`).                  |
| `container-name` | ✅        | -        | Name of the container to upgrade.                       |
| `image-repo`     | ✅        | -        | Image repository (e.g., `ghcr.io/my-org/app`).          |
| `image-version`  | ❌        | `latest` | Tag (`v1.2.0`) or digest (`sha256:abcd...`).            |

### **📜 Use Cases**  
✔ **CI/CD Pipelines** – Auto-update containers after a new image is pushed.  
✔ **Rollback Support** – Pin to a specific SHA256 digest for stability.  
✔ **Multi-Environment Deploys** – Use different API versions for dev/prod.  

### **🔧 How It Works**  
1. **Generates a secure token** using 1Panel’s auth mechanism.  
2. **Calls the 1Panel API** (`/api/{version}/containers/upgrade`).  
3. **Verifies success** (checks for HTTP 200 response).  
4. **Logs results** for debugging and auditing.  

---

**⚡ Get Started Now!**  
Add this action to your workflow for effortless 1Panel container upgrades.  

```yaml
- uses: persiliao/1panel-upgrade-container-action@v1
```  

**🔗 Learn more about 1Panel:** https://1panel.pro/docs
