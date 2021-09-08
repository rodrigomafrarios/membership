provider "aws" {
  profile = module.global_variables.profile
  region  = module.global_variables.region
}
