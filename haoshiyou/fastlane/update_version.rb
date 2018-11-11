#!/usr/bin/env ruby
require 'nokogiri'

def assert (condition, msg)
  if (condition == false)
    throw msg
  end
end

def read_current_version
  @doc = File.open("../config.xml") do |f|
    Nokogiri::XML(f)
  end
  version = @doc.xpath("//@version").to_s
  return version
end

def increment_version(old_version)
  version_splitted = old_version.split(".")
  assert(version_splitted.length == 3, 'The version needs to be in NUM.NUM.NUM format')
  version_splitted[0] = version_splitted[0].to_i
  version_splitted[1] = version_splitted[1].to_i
  version_splitted[2] = version_splitted[2].to_i
  version_splitted[2] += 1
  assert(version_splitted[0] <= 99, 'version should be less than 99')
  assert(version_splitted[1] <= 99, 'version should be less than 99')
  assert(version_splitted[2] <= 99, 'version should be less than 99')
  return version_splitted
end

def write_new_version (new_version_array = nil)
  filename = "../config.xml"
  @doc = File.open(filename) do |f|
    Nokogiri::XML(f)
  end
  @doc.root['version'] = new_version_array.join('.')
  @doc.root['android-versionCode'] =
      new_version_array[0] * 1000000 + new_version_array[1] * 10000 + new_version_array[0] * 100
  File.write(filename, @doc.to_xml)
end

old_version = read_current_version
new_version = increment_version old_version
write_new_version new_version
