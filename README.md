# kaholo-plugin-svn
Apache Subversion(SVN) plugin for Kaholo.

## How To Use
After installing this plugin make sure you have SVN installed on all the agents that will run this plugin. You can download it from [here](https://subversion.apache.org/packages.html).

## Method: Checkout
Checks out a repository to a working copy.

### Parameters
1. Repository URL (String) **Required** -  The URL of the repository to check out.
2. Working copy (String) **Required** - Path of working copy directory.
3. User (String) **Required** - Username to authenticate with.
4. Password (Vault) **Required** - Password to authenticateto with.

## Method: Get Revision
Gets head revision of the specified repository.

### Parameters
1. User (String) **Required** - Username to authenticate with.
2. Password (Vault) **Required** - Password to authenticateto with.
3. SVN URL/path to WC (String) **Required** - Repository URL or path of working copy directory.

## Method: Get Task Numbers
Get all task numbers of a specified repository from its log file.

### Parameters
1. User (String) **Required** - Username to authenticate with.
2. Password (Vault) **Required** - Password to authenticateto with.
3. SVN URL/path to WC (String) **Required** - Repository URL or path of working copy directory.
4. Revision Range (String) **Optional** - Revision or revision range (1:10).
5. Search Regexp (String) **Required** - Regexp to use to filter task number from log file in eah revision. 




